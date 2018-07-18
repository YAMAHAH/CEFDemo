using System;
using System.IO;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

namespace CEFDemo
{
    public partial class MainForm : Form
    {
        public ChromiumWebBrowser chromeBrowser;

        public void InitializeChromium()
        {
            CefSettings settings = new CefSettings();
            String page = string.Format(@"{0}\html-resources\html\index.html", Application.StartupPath);
            //String page = @"C:\Users\SDkCarlos\Desktop\artyom-HOMEPAGE\index.html";
            page = "http://localhost:4200";
            //if (!File.Exists(page))
            //{
            //    MessageBox.Show("Error The html file doesn't exists : " + page);
            //}
            // Initialize cef with the provided settings
            if (!Cef.IsInitialized)
            {
                Cef.Initialize(settings);
            }
           
          
            // Create a browser component https://angular.io/guide/quickstart"
            chromeBrowser = new ChromiumWebBrowser(page);
           
            // Add it to the form and fill it to the form window.
            this.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;
            BrowserSettings browserSettings = new BrowserSettings
            {
                FileAccessFromFileUrls = CefState.Enabled,
                UniversalAccessFromFileUrls = CefState.Enabled
            };
            chromeBrowser.BrowserSettings = browserSettings;
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
        }

        public MainForm()
        {
            InitializeComponent();
            InitializeChromium();
            // Register an object in javascript named "cefCustomObject" with function of the CefCustomObject class :3
            chromeBrowser.RegisterJsObject("cefCustomObject", new CefCustomObject(chromeBrowser, this), new BindingOptions()
            {
                CamelCaseJavascriptNames = true
            });
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            chromeBrowser.IsBrowserInitializedChanged += ChromeBrowser_IsBrowserInitializedChanged;
            
        }

        private void ChromeBrowser_IsBrowserInitializedChanged(object sender, IsBrowserInitializedChangedEventArgs e)
        {
            //chromeBrowser.ShowDevTools();
            IFrame frame = chromeBrowser.GetBrowser().MainFrame;
            frame.ExecuteJavaScriptAsync("TestMethod('111')");
            var list = chromeBrowser.GetBrowser().GetFrameNames();
            foreach (var item in list)
            {
                chromeBrowser.GetBrowser().GetFrame(item).ExecuteJavaScriptAsync("TestMethod('1234')");
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
           // chromeBrowser.Dispose();
           // Cef.Shutdown();
        }
    }
}
