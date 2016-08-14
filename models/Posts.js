var markdown=require('markdown').markdown;

var mongodb=require('./db');

function Posts(name,title,post){
	this.name=name;
	this.title=title;
	this.post=post;

}

module.exports=Posts;
Posts.getOne=function(name,day,title,callback) {
	mongodb.open(function(err,db){
		if (err) {
			console.log(err);
			return callback(err);
		}

		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				console.log(err);
				return callback(err);
			}
			collection.findOne({
				"name":name,
				"time.day":day,
				"title":title
			},function(err,doc){
				mongodb.close();
				if (err) {
					console.log(err);
					return callback(err);
				}
				console.log(doc.post);
				doc.post=markdown.toHTML(doc.post);
				callback(null,doc);
			});
		});
	});
	// body...
};

