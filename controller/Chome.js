const { user } = require("../model");
const  {notebook}  = require("../model");

// allblog page
exports.home =async (req, res) => {
  let users=[]
  let blogs =[]
  const alluser= await user.findAll({
    attributes: ['id', 'email'], // 필요한 노트북 속성 선택
   
  });
  alluser.map(async(user)=>{
   users.push( user.dataValues)
  })

  const allNotebook = await notebook.findAll({
    attributes:['noteId','title','content',]
  }) 
  allNotebook.map(async(user)=>{
    blogs.push( user.dataValues)
   })
 
  console.log(users, blogs)

  res.render("allblog.ejs", { users, blogs });
};
