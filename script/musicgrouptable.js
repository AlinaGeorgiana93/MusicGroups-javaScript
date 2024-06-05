'use strict';

import musicService from'./music-group-service.js';

    //module global variables
    //const _library = new LibraryService(sessionStorage);
    const _musicservice = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
   
    

    //paging
    const _pageSize = 10;
    let _currentPage = 0;
    let _maxNrpages;
    let searchParameter='';

    //Get Elements
    const musicList = document.querySelector("#musicList");
    const btnPrev = document.querySelector("#btnPrev");
    const btnNext = document.querySelector("#btnNext");
    const btnSearchInput = document.querySelector("#searchInput");
    const searchInput = document.querySelector('#search');

    //Add event listeners
    btnPrev.addEventListener("click", clickPrev);
    btnNext.addEventListener("click", clickNext);
    btnSearchInput.addEventListener("click", clickSearchInput);

    //Declare event handlers
    async function clickPrev (e){

        if (_currentPage > 0 ) {
            _currentPage--;
            await renderMusicGroupsAsync(_currentPage, searchParameter);
        }
    }

    async function clickNext (e){
        if (_currentPage < _maxNrpages-1) {
            _currentPage++;
            await renderMusicGroupsAsync(_currentPage, searchParameter);
        }
    }
    async function clickSearchInput(e) {
        e.preventDefault(); // Prevent the form from submitting
        
        searchParameter = searchInput.value;
        _currentPage = 0; // Reset to the first page on new search
    
        await renderMusicGroupsAsync(_currentPage, searchParameter);
    }
    
    //helpers
    function addRow(musicGroupId, name, establishedYear, strGenre) {
        let divRow = document.createElement(`div`);
        divRow.classList.add("trFluid");
    
        let divGroup2 = document.createElement(`div`);
        divGroup2.classList.add("trFluid_Grouping2");
        divRow.appendChild(divGroup2);
    
    
        let divGroup1_1 = document.createElement(`div`);
        divGroup1_1.classList.add("trFluid_Grouping1");
        let divGroup1_2 = document.createElement(`div`);
        divGroup1_2.classList.add("trFluid_Grouping1");
        divGroup2.appendChild(divGroup1_1);
        divGroup2.appendChild(divGroup1_2);
    
    
        //<div class="tdFluent"></div>
        let divFluent1 = document.createElement(`div`);
        divFluent1.classList.add("tdFluent");
        divFluent1.innerHTML = `<a href="./view-song.html?id=${musicGroupId}">${name}</a>`;
        divGroup1_1.appendChild(divFluent1);
    
        let divFluent2 = document.createElement(`div`);
        divFluent2.classList.add("tdFluent");
        divFluent2.innerHTML = establishedYear;
    
        let divFluent3 = document.createElement(`div`);
        divFluent3.classList.add("tdFluent");
        divFluent3.innerHTML = strGenre;
    
    
        divGroup1_2.appendChild(divFluent2);
        divGroup1_2.appendChild(divFluent3);

        musicList.appendChild(divRow);
    }

    async function renderMusicGroupsAsync(_pageNr) {
        while (musicList.firstElementChild !== null) {
            musicList.removeChild(musicList.firstElementChild);
        }

        let response = await _musicservice.readMusicGroupsAsync(_pageNr, false, searchParameter, _pageSize);
        response.pageItems.forEach(g => {addRow(g.musicGroupId, g.name, g.establishedYear, g.strGenre)});
        
        //for debugging
        console.log(response.dbItemsCount);
        
        _maxNrpages = response.pageCount;
    }

    


    //init
    (async function pageInit() 
    {
       //await renderAlbumsAsync(_currentPage);
       await renderMusicGroupsAsync(_currentPage);
        
    })();