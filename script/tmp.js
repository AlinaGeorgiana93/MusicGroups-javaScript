    //temporary a list made from seedGeneration
    //in reality a WebApi communication
    if (!storage) {
        const _seeder = new seedGenerator();
        this.books = new Group().seedMany(1_000, _seeder);
    }
    else {        
        const tmp = storage.getItem('LibraryService');
        if (tmp) {
            this.groups = JSON.parse(tmp);
        }
        else{
            const _seeder = new seedGenerator();
            this.groups = new Group().seedMany(1_000, _seeder);
            storage.setItem('LibraryService', JSON.stringify(this.groups));
        }
    }