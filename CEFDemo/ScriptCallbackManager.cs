using CefSharp;
using System.Threading.Tasks;

namespace CEFDemo
{
    public class ScriptCallbackManager
    {     
        public void FindComputerInfo(IJavascriptCallback javascriptCallback)
        {
            Task.Factory.StartNew(async () =>
            {
                using (javascriptCallback)
                {

                    string response = "callback";
                    await javascriptCallback.ExecuteAsync(response);
                }
            });
        }
    }
}
