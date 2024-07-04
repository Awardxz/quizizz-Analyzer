const input = document.querySelector('.inputReader')
const inputRecieve = document.querySelector(".inputRecieve");
input.addEventListener('click',() => {


   if (inputRecieve.value !== "") {
    axios.post("http://localhost:8080/answer" , {
        value : inputRecieve.value
    }).then(response => {
        const result = response.data

        console.log(result);
        const resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = "";
        createElement(result);
    })
   } 

})


function createElement(result) {
    const resultContainer = document.querySelector('.result');
    
    result.forEach(item => {
        // Create a div for each question-answer pair
        const qaContainer = document.createElement('div');
        qaContainer.classList.add('qa-container');
        
        // Create and append the question div
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const questionText = document.createTextNode(`Pyetja : ${item.question}`);
        questionDiv.appendChild(questionText);
        qaContainer.appendChild(questionDiv);
        
        // Create and append the answer div
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        const answerText = document.createTextNode(`Pergjigja : ${item.answer}`);
        answerDiv.appendChild(answerText);
        qaContainer.appendChild(answerDiv);
        
        // Append the question-answer container to the result container
        resultContainer.appendChild(qaContainer);
    });
}



