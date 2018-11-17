using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR_Service
{
    public class SignalRServiceHub : Hub
    {
        public void Ping()
        {
            Clients.Caller.Pong(DateTime.Now);
        }
    }
}
