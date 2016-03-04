var DB = function() {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.DBNAME = 'saltbot'
	this.DBVERSION = 3;
	
	this.saltbotdb = indexedDB.open(this.DBNAME, this.DBVERSION);

	this.saltbotdb.onerror = function(event) {
		console.log("Failed to open saltbot database");
	};
	
	this.saltbotdb.onupgradeneeded = function(event) {
		console.log("Database upgrade in progress...");
		var db = event.target.result;
		this.matchesStore = db.createObjectStore("matches", { autoIncrement : true });
		this.matchesStore.createIndex("c1", "c1", { unique: false });
		this.matchesStore.createIndex("c2", "c2", { unique: false });
		this.matchesStore.createIndex("w", "w", { unique: false });
		this.matchesStore.createIndex("sn", "sn", { unique: false });
		this.matchesStore.createIndex("pw", "pw", { unique: false });
		this.matchesStore.createIndex("t", "t", { unique: false });
		this.matchesStore.createIndex("m", "m", { unique: false });
		this.matchesStore.createIndex("o", "o", { unique: false });
		this.matchesStore.createIndex("ts", "ts", { unique: false });
		this.matchesStore.createIndex("cf", "cf", { unique: false });
		this.matchesStore.createIndex("if", "if", { unique: false });
		this.matchesStore.createIndex("dt", "dt", { unique: false });
	};
	
	this.saltbotdb.onsuccess = function(event) {
		var db = event.target.result;
		console.log("Opened saltbot database..." + db);
		this.saltdb = db;
	};

};

DB.prototype.addMatch = function(match) {

	var db = indexedDB.open(this.DBNAME, this.DBVERSION);
	db.onsuccess = function(event) {
			var saltdb = event.target.result;
			saltdb.transaction(["matches"], "readwrite").objectStore("matches").add(match).onsuccess = function(event) {
			console.log("added a new match to the database")
		};
	};
};
