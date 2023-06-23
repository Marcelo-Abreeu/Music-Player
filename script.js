// DECLARANDO VÁRIAVEIS

let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_button = document.querySelector('#volume_button');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let music_image = document.querySelector('#music_image');
let auto_play = document.querySelector('#auto');
let music_present = document.querySelector('#music_present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

// CRIANDO O ELEMENTO DE AÚDIO
let track = document.createElement('audio');

// LISTA COM TODAS AS MÚSICAS
let All_song = [{
		name: "Stressed Out",
		path: "music/StressedOut.mp3",
		img: "img/img1.png",
		singer: "Twenty One Pilots"
	},
	{
		name: "Nevada",
		path: "music/Nevada.mp3",
		img: "img/img1.png",
		singer: "Vicetone"
	},
	{
		name: "Freaks Slowed",
		path: "music/Freaks.mp3",
		img: "img/img3.png",
		singer: "Surf Curse"
	},
    {
		name: "Goosebumps",
		path: "music/Goosebumps.mp3",
		img: "img/img4.png",
		singer: "Travis Scott"
	},
    {
		name: "Play K-391",
		path: "music/Play.mp3",
		img: "img/img5.png",
		singer: "Alan Walker"
	}

];


// TODAS AS FUNÇÕES

// FUNÇÃO CARREGAR A PLAYLIST
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	music_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	music_present.innerHTML = index_no + 1;
}

load_track(index_no);


// DEIXAR MUDO A MÚSICA
function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_button.innerHTML = 0;
}


// CHECANDO.. SE A MÚSICA ESTÁ TOCANDO OU NÃO
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// REDEFINIR A BARRA DE INPUT AO TOCAR A MÚSICA
function reset_slider() {
	slider.value = 0;
}

// INICIAR MÚSICA
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// PAUSAR MÚSICA
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// PRÓXIMA MÚSICA
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}

// MÚSICA ANTERIOR
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}

// ALTERAR O VOLUME
function volume_change() {
	volume_button.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// ALTERAR A BARRA DESLIZANTE DO INPUT
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// FUNÇÃO DE AUTOPLAY
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#F9004D";
	}
}

function range_slider() {
	let position = 0;

	// ATUALIZAR A BARRA DESLIZANTE DO INPUT
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// FUNÇÃO PARA QUANDO A MÚSICA TERMINA
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}
