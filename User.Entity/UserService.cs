using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User.Entity
{
    public  class UserService
    {
        public List<User> getAllUsers()
        {
            using (var db = new UserDB())
            {
                var result = from c in db.users select c;
                List<User> all = result.ToList<User>();
                return all;
            }
        }

        //检验账号是否能够注册
        public bool[] register(String name,String passWord,String email)
        {
            bool[] conseq = new bool[2];
            conseq[0] = true;//用于验证是否重名
            conseq[1] = true;//用于验证邮箱地址是否重复
            using (var db = new UserDB())
            {
                var result = from c in db.users where c.name.Equals(name) || c.email.Equals(email)  select c;
                List<User> all = result.ToList<User>();
                //检验账号以及邮箱地址是否重复
                foreach (User c in all)
                {
                    if (c.name.Equals(name))
                    {
                        conseq[0] = false;
                    }

                    if (c.email.Equals( email))
                    {
                        conseq[1] = false;
                    }
                }
            }
            return conseq;
        }

        //注册
        public void signUP(String name, String passWord, String email)
        {
            using (var db = new UserDB())
            {
                //添加新账户信息
                User newuser = new User();
                newuser.name = name;
                newuser.passWord = passWord;
                newuser.email = email;
                newuser.photoN = 0;//图片数初始为0
                //录入数据库
                db.users.Add(newuser);
                db.SaveChanges();
            }
       }

        //登陆
        public bool login(String name, String passWord)
        {
            using (var db = new UserDB())
            {
                var result = from c in db.users where c.name.Equals(name) && c.passWord.Equals(passWord) select c;
                //如果找到账号
                List<User> all = result.ToList<User>();
                if (all.Count>0)
                {
                    return true;
                }
            }
            return false;
        }   
    }
}
