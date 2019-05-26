
// var topic = 'data%20structures';

var time_in_minutes = 45;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);

var searchFor = function search(){
    
    var topic = document.getElementById('searchBox').value;
    topic = getTag(topic).toLowerCase();
    
    topic.replace(/ /g, '+');
    //console.log(topic);
    
    axios.get(`http://codeforces.com/api/problemset.problems?tags=${topic}`)
    .then(function(response){
    var problems = response.data.result.problems;
    //console.log(problems.length);
    //console.log(document.getElementById('listBox').classList);
    if(problems.length===0){
        throw new Error();
    }
    getVideos(topic);
    var ul = document.getElementById('listBox');
    document.getElementById('qList').classList.remove('hide-display');
    document.getElementById('videoBox').classList.remove('hide-display');
    document.getElementById('heading').innerText = `Problems on ${topic} :`;
    ul.innerHTML = "";
   // console.log(response);
    for(var i=0;i<8;i++){
        var problemBox = problemBoxCreator(problems[i]);
        ul.appendChild(problemBox);
    }
    }).catch(function(response){
        document.getElementById('qList').classList.add('hide-display');
        document.getElementById('videoBox').classList.add('hide-display');
        document.getElementById('searchBox').value = "";
        document.getElementById('searchBox').placeholder = 'Sorry! Topic not available rn.';

        //console.log(document.getElementById('qList'));
    });


};


function getTag(topic){
    if(topic==='stacks'||topic==='queues'){
        return 'data+strcutures';
    }else if(topic==='dynamic programming'){
        return 'dp';
    }else if(topic==='sorting'){
        return 'sortings';
    }else if(topic==='maths'){
        return 'math';
    }
    return topic;
}




function problemBoxCreator(problem){

    var problemBox = document.createElement('li');
    problemBox.classList.add('problem-box');
    problemBox.innerHTML = `<p>${problem.name}</p><a class='btn btn-primary' href='http://www.codeforces.com/problemset/problem/${problem.contestId}/${problem.index}'>Solve!</a>`
    return problemBox;

}


document.getElementById('timeRem').classList.add('hide-display');

function codeChallengesInitiator(button){
    
    button.classList.add('fade-display')

    axios.get('https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/algorithms/')
    .then(function(response){
        button.classList.add('hide-display');
        button.classList.remove('fade-display');
        document.getElementById('timeRem').classList.toggle('hide-display');
        var leetAlgoContainer = document.getElementById('ques');
        ques.innerHTML = "";
        run_clock('clockdiv',deadline);
        for(var i=0;i<2;i++){
            var index = Math.floor((Math.random()*1000)%996);
            var challenge = challengeCreator(response.data.stat_status_pairs[index]);
            leetAlgoContainer.appendChild(challenge);
        }

    });
}



function challengeCreator(challengeQues){

    var div  = document.createElement('div');
    div.innerHTML = `<h2>${challengeQues.stat.question__title}</h2><p>Difficulty: ${challengeQues.difficulty.level}</p><a target="_blank" class="btn btn-info" href='https://leetcode.com/problems/${challengeQues.question__title_slug}/'>Let's solve it!</a>`;
    div.classList.add('challenge-cards');
    return div;
}


function getVideos(searchString){
    var outerDiv = document.getElementById('videoBox');
    outerDiv.innerHTML="";
    outerDiv.innerHTML = '<div cl><p id="heading" class="display-3">Video References: </p><hr></div>';
    searchString+='+computer+science';
    console.log(searchString);
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q="${searchString}"&type=video&key=AIzaSyAqwA4O_fmm8ThUT9k6sXwA-X-B6DsPf1g`)
    .then(function(response){
       console.log(response);

        var videoList = response.data.items;
        
        for(let i =0;i<2;i++){
            var iFrame = getIFrame(response.data.items[i].id.videoId);
            outerDiv.appendChild(iFrame);

        }
    })

}

function getIFrame(videoId){

    var frame = document.createElement('iframe');
    frame.setAttribute('src',`http://www.youtube.com/embed/${videoId}`);
    frame.setAttribute('height','315');
    frame.setAttribute('width','420');
    frame.classList.add('video-frame');
    return frame;

}




function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = '<div class="display-4">'+t.minutes+' m : '+t.seconds+' s</div>';
        if(t.total<=0){ clearInterval(timeinterval); 
        //codeChallengesInitiator();
        clock.innerHTML = `<div class="display-4 danger">Time's up!</div>`;
        document.getElementById('ques').classList.add('disable-click');
        }
	}
	update_clock(); 
    var timeinterval = setInterval(update_clock,1000);
    
}

