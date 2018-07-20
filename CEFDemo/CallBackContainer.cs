using System;
using System.Collections.Generic;

namespace CEFDemo
{
    public class CallBackContainer
    {
        private static Dictionary<string, IList<Action<string>>> actionLists = new Dictionary<string, IList<Action<string>>>();


        public static void RegisterCallbackAction(string key,Action<string> action)
        {
            if (actionLists.ContainsKey(key))
            {
                actionLists[key].Add(action);
            }
            else
            {
                actionLists.Add(key, new List<Action<string>>() { action });
            }
        }
        

        public static void Execute(string key,string jsonData)
        {
            if (actionLists.ContainsKey(key))
            {
                IList<Action<string>> actionList = null;
                actionLists.TryGetValue(key, out actionList);
                if(actionList != null)
                {
                    foreach (var action in actionList)
                    {
                        action(jsonData);
                    }
                    actionLists.Remove(key);
                }
            }
        }

    }
}
