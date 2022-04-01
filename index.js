let button = document.querySelector('#one');
let compare = document.querySelector('#submit')
let input = document.querySelector('input');
let restart = document.getElementById('restart')
let score = document.querySelector('.score')
let country = document.querySelector('.country')

let count = 0;
score.innerHTML = count;

let promises = []

function generate(){
    if(promises.length == 0){
        fetch('https://countriesnow.space/api/v0.1/countries/capital')
        .then(res => {
            return res.json();
        })
        .then(data => {
            let index = Math.floor(Math.random() * (data.data.length - 0 + 1)) + 0;
            promises.push(`${data.data[index].capital}`)
            console.log(`${data.data[index].name} - ${data.data[index].capital}`)
            country.innerHTML = data.data[index].name
        })
        .catch(e => {
            console.log(e)
        })
    }else{
        console.log('You have unguessed capital!')
    }
}

button.addEventListener('click',function(){
    generate()
})

compare.addEventListener('click',function(){
    if(input.value === ''){
        alert("The field could not be empty!")
    }else{
        if(input.value.charAt(0).toUpperCase()+input.value.slice(1) === promises[0]){
            count+=1
            promises.pop()
            score.innerHTML = count;
            input.value = ''
            generate()
        }else{
            input.value = ''
            compare.style.visibility = 'hidden'
            score.innerHTML = `Your score is: ${count}`
            country.innerHTML = ''
        }
    }
})

restart.addEventListener('click',function(){
    if(promises.length != 0){
        compare.style.visibility = 'visible'
        count = 0
        score.innerHTML = count;
        promises.pop()
        generate()
    }
})

