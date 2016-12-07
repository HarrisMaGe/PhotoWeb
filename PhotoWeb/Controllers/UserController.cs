using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using User.Entity;
namespace PhotoWeb.Controllers
{
    public class UserController : ApiController
    {
        UserDBService myUserDBService = new UserDBService();
        
        
        //注册账户
        [Route("api/User/login")]
        [HttpGet]
        public void login(String name, String passWord, String email)
        {
           bool[] isVaild= myUserDBService.register(name, passWord, email);
            if (isVaild[0]==false)
            {
                //账号重复
                return;
            }
            if (isVaild[1] == false)
            {
                //邮箱重复
                return;
            }
            //成功注册账户
            myUserDBService.signUP(name, passWord, email);
        }

    }
}
