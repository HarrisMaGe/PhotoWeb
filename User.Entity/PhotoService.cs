using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User.Entity
{
     public class PhotoService
    {
        //通过用户名读取图片
        public String[] getPhotoByUser(String user)
        {
            using (var db = new UserDB())
            {
                var result = from c in db.photos where c.user.Equals(user) select c;
                List<Photo> all = result.ToList<Photo>();
                //如果该用户有图片
                if (all[0] != null)
                {
                    //用String数组保存地址
                    String[] srcs = new String[all.Count];
                    int i = 0;
                    foreach (Photo p in all)
                    {
                        srcs[i] = p.src;
                        i++;
                    }
                    return srcs;
                }
                //如果没有照片返回null
                return null;
            }
        }

        //获取所有图片
        public Dictionary<String, String> getAllPhoto()
        {
            using (var db = new UserDB())
            {
                var result = from c in db.photos  select c;
                List<Photo> all = result.ToList<Photo>();
                //如果该有图片
                if (all[0] != null)
                {
                    //用字典保存地址
                    Dictionary<String, String> srcs = new Dictionary <String, String>();
                    int i = 0;
                    foreach (Photo p in all)
                    {
                        srcs.Add(p.user,p.src);
                    }
                    return srcs;
                }
                //如果没有照片返回null
                return null;

            }

        }

        //检查单个图片地址是否已经存在
        public bool isExited(String src)
        {
            using (var db = new UserDB())
            {
                var result = from c in db.photos where c.src.Equals(src) select c;
                List<Photo> all = result.ToList<Photo>();
                //如果有该图片
                if (all.Count>0)
                {
                    return true;
                }
                //如果没有照片返回false
                return false;
            }
        }

        //插入一组新图片
        public void insert(Dictionary<String, String> newPhoto)
        {
            using (var db = new UserDB())
            {
                foreach (KeyValuePair<string, string> kvp in newPhoto)
                {
                    //在图片表存入图片
                    Photo myPhoto = new Photo();
                    myPhoto.user = kvp.Value;
                    myPhoto.src = kvp.Key;
                    db.photos.Add(myPhoto);
                    

                    //在用户表添加图片数目
                    var user = from c in db.users where c.name.Equals(myPhoto.user) select c;
                    List<User> all = user.ToList<User>();
                    //如果有该用户
                    if (all.Count > 0)
                    {
                        all[0].photoN++;
                    }
                }
                db.SaveChanges();
            }
        }

        //删除一组图片
        public void delete(Dictionary<String, String> newPhoto)
        {
            using (var db = new UserDB())
            {
                foreach (KeyValuePair<string, string> kvp in newPhoto)
                {
                    //在图片表添加图片数据
                    Photo myPhoto = new Photo();
                    myPhoto.user = kvp.Value;
                    myPhoto.src = kvp.Key;
                    db.photos.Remove(myPhoto);

                    //在用户表减少图片数目
                    var user = from c in db.users where c.name.Equals(myPhoto.user) select c;
                    List<User> all = user.ToList<User>();
                    //如果有该用户
                    if (all.Count > 0)
                    {
                        all[0].photoN--;
                    }
                }
                db.SaveChanges();
            }
        }
    }
}
