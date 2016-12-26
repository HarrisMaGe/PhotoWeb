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
        public UserDB() : base("UserPhotoDB") { }
        public DbSet<User> users { get; set; }//user表
        public DbSet<Photo> photos { get; set; }//photo表
    }

    public class User
    {
        [Key]
        public String name { get; set; }//用户名
        public int photoN { get; set; }//照片数量
        public String passWord { get; set; }//密码
        public String email { get; set; }//用户邮箱
    }

    public class Photo
    {
        [Key]
        public string src { get; set; } //地址，地址为相对路径，从appStart开始
        public string user { get; set; }//用户名      
    }
}
