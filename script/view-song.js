'use strict';

import musicService from'./music-group-service.js';

//module global variables
let url = new URL(window.location);
let params = url.searchParams;
let id = params.get("id"); 

const _musicservice = new musicService (`https://appmusicwebapinet8.azurewebsites.net/api`);
//Get Elements
const name = document.querySelector("#name");
const genre = document.querySelector("#genre");
const establishedYear = document.querySelector("#establishedYear");

//Init
(async function pageInit() 
{
   const musicGroup = await _musicservice.readMusicGroupAsync(id);
   name.value = musicGroup.name;
   genre.value = musicGroup.strGenre;
   establishedYear.value = musicGroup.establishedYear;
    
})();
