(function() {
  const myQuestions = [
    {
      question: "1.The circuit used for producing AM is called?",
      answers: {
        a: "Modulator",
        b: "Transmitter",
        c: "Receiver",
        d:" Duplexer"
      },
      correctAnswer: "a"
    },
    {
      question: "2.In Amplitude Modulation, the instantaneous values of the carrier amplitude changes in accordance with the amplitude and frequency variations of the modulating signal.",
      answers: {
        a: "True",
        b: "False",
       
      },
      correctAnswer: "a"
    },
    {
      question: "3.What is the line connecting the positive and negative peaks of the carrier waveform called? ",
      answers: {
        a: "Peak line",
        b: "Maximum amplitude ceiling",
        c: "Modulation index",
        d: "Envelope"
    },
      correctAnswer: "d"
    },  
    {
      question: "4.The ratio between the modulating signal voltage and the carrier voltage is called? ",
      answers: {
        a: "Amplitude modulation",
        b: "Modulation frequency",
        c: "Modulation index",
        d: "Ratio of modulation"
      },
      correctAnswer: "c" 
    },
    {
      question: "5.What happens when the amplitude of the modulating signal is greater than the amplitude of the carrier?",
      answers: {
        a: "Decay ",
        b: "Distortion",
        c: "Amplification",
        d: "Attenuation"
    },
      correctAnswer: "b"
    },  
    {
      question: "6.What is the condition for greatest output power at the transmitter without distortion? ",
      answers: {
        a: "Modulating signal voltage > Carrier voltage",
        b: "Modulating signal voltage < Carrier voltage",
        c: "Modulating signal voltage = Carrier voltage",
        d: "Modulating signal voltage = 0"
      },
      correctAnswer: "c" 
    },
     
    {
      question: "7.What is the bandwidth of the signal if the highest frequency in the modulating signal is 3 KHz?",
      answers: {
        a: "6Khz",
        b: "3KHz",
        c: "5KHz",
        d: "140KHz"
      },
      correctAnswer: "a" 
    },
    {
      question: "8.What is the wave of frequency that occurs at the sum and difference of the carrier and modulating signal is called? ",
      answers: {
        a: "Noise signals ",
        b: "Sideband",
        c: "Extraband",
        d: "Neutral band"
      },
      correctAnswer: "b" 
       
     
     
    }
    
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
