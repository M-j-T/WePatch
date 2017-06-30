var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/sample.sqlite3');

db.serialize(function() {
    db.run("CREATE TABLE tbl (info TEXT, val INT)");

    var stmt = db.prepare("INSERT INTO tbl (info, val) VALUES (?, ?)");
    for (var i = 0; i < 10; i++) {
  stmt.run(['DATA', i]);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info, val FROM tbl", function(err, row) {
  console.log(row.id + ": " + row.info + " is " + row.val);
    });
});

db.close();