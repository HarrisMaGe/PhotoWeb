using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

//用于保存用户数据的数据库
namespace User.Entity
{
    public class UserDB : DbContext//建立上下文环境
    {
        public UserDB() : base("UserDB") { }
        public DbSet<User> users { get; set; }//user表
    }

    public class User
    {
        public String name { get; set; }//用户名
        public String passWord { get; set; }//密码
        public String email { get; set; }//用户邮箱
        [Key]//id为主键     
        public String id { get; set; }//唯一标识用作识别
    }
}
