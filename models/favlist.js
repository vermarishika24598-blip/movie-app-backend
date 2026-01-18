const mongoose=require("mongoose");

const favlistSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    movieId:{
        type:String,
        require:true
    },
    title:String,
    poster:String,
},
{ timestamps: true }
);

module.exports=mongoose.models.Favlist ??
  mongoose.model("Favlist", favlistSchema);
