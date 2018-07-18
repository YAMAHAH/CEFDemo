using CefSharp;
using CefSharp.WinForms;
using Newtonsoft.Json;
using RSG;
using System.Diagnostics;
using System.Dynamic;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CEFDemo
{
    class CefCustomObject
    {
        // Declare a local instance of chromium and the main form in order to execute things from here in the main thread
        private static ChromiumWebBrowser _instanceBrowser = null;
        // The form class needs to be changed according to yours
        private static MainForm _instanceMainForm = null;


        public CefCustomObject(ChromiumWebBrowser originalBrowser, MainForm mainForm)
        {
            _instanceBrowser = originalBrowser;
            _instanceMainForm = mainForm;
        }

        public void ShowDevTools()
        {
            _instanceBrowser.ShowDevTools();
        }

        public void Opencmd()
        {
            ProcessStartInfo start = new ProcessStartInfo("cmd.exe", "/c pause");
            Process.Start(start);
        }
        public void Print(string data)
        {
            var frame = _instanceBrowser.GetBrowser().MainFrame;
            frame.ExecuteJavaScriptAsync("TestMethod('3535')");
            var list = _instanceBrowser.GetBrowser().GetFrameNames();
            foreach (var item in list)
            {
                _instanceBrowser.GetBrowser().GetFrame(item).ExecuteJavaScriptAsync("TestMethod('1234')");
            }
           
            MessageBox.Show(data);
        }
        public void CSharpCallback()
        {
            var frame = _instanceBrowser.GetBrowser().MainFrame;
            var task = frame.EvaluateScriptAsync("new ngService.TestService().getOrder()", null);

            task.ContinueWith(t =>
            {
                if (!t.IsFaulted)
                {
                    var response = t.Result;
                    var evaluateJavaScriptResult = (response.Success ? (response.Result ?? "null") : response.Message);
                    MessageBox.Show(evaluateJavaScriptResult.ToString());
                }
            }, TaskScheduler.Default);
        }

        public void JSCallback(IJavascriptCallback callback)
        {
            new ScriptCallbackManager().FindComputerInfo(callback);
        }
    }
}
