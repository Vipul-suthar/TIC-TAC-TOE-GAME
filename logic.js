const cellElements = document.querySelectorAll(".cell_container .cell")

// const boardState = Array(cellElements.length);
// boardState.fill(null);

cellElements, Array(9);
const p1 = document.querySelector(".players .player1")
const p2 = document.querySelector(".players .player2")



const result = document.querySelector('.result')
    // const gameOver = document.querySelector('.result h1')
const result_text = document.querySelector('.result h2')
const playAgain = document.querySelector('.result .playAgain')



const main_cont = document.querySelector('.main_container')
const st_page = document.querySelector('.starting_page')


const line = document.querySelector('.line')

const choose = document.querySelectorAll('.choose')

let clicktone = new Audio('clicktone.wav')
let draw = new Audio('draw.wav')
let win = new Audio('win.wav')
let BGM = new Audio('BGM.mp3')
let BGM2 = new Audio('BGM2.mp3')


const winning_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


const px = 'X'
const po = 'O'
let toggleTurn = null;


choose.forEach(chooseNow => {
    chooseNow.onclick = () => {
        if (chooseNow.id === 'playX') {
            toggleTurn = true;

        } else {
            toggleTurn = false;
            p2.classList.add('active');
            p1.classList.remove('active')

        }
        // main_cont.classList.remove('main_cont')
        main_cont.classList.remove('inactive')
        st_page.classList.add('st_page')
            // BGM2.pause();
            // BGM.play();
    }
})



let m = 0;
let s = 1;
BGM2.play();
// music_play_pause();

function music_play_pause() {
    if (m == 1) {
        BGM2.play();
        return m = 0;
    } else {
        BGM2.pause();
        return m = 1;
    }
}
main();

function main() {

    cellElements.forEach(cells => {
        // music_play_pause();

        cells.onclick = () => {


            let currentPlayer = toggleTurn == true ? px : po;


            // clicktone.play();
            sound_play_pause();
            sound_play_pause();



            cells.classList.add('disable');

            cells.innerText = currentPlayer;

            cells.classList.add(currentPlayer);

            // console.log(winnerCheck(currentPlayer))

            if (winnerCheck(currentPlayer) !== -1) {
                // win.play();

                // sound_play_pause();
                if (sound_play_pause() == 0) {
                    win.play();
                    clicktone.play();

                } else {
                    win.pause();
                    clicktone.pause();
                }

                const index = winnerCheck(currentPlayer)
                line.classList.add(`line_${index}`);

                setTimeout(function() {
                    result_text.innerText = currentPlayer + ' Player ' + "WIN THE GAME."

                    result.classList.remove('inactive')
                    main_cont.classList.add('main_cont')
                }, 1500);

            } else if (isDraw()) {




                if (sound_play_pause() == 0) {
                    draw.play();
                    clicktone.play();

                } else {
                    draw.pause();
                    clicktone.pause();
                }



                result_text.innerText = " DRAW THE GAME !"

                setTimeout(function() {
                    result.classList.remove('inactive')
                    main_cont.classList.add('main_cont')
                }, 600);


            }

            swapPlayer();
            // winnerCheck();

        }

    });
}

function winnerCheck(currentPlayer) {
    return winning_conditions.findIndex(condition => {
        return condition.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(px) || cell.classList.contains(po);
    })
}

function swapPlayer() {
    toggleTurn = !toggleTurn;
    if (toggleTurn == true) {
        p1.classList.add('active');
        p2.classList.remove('active')
    } else {
        p2.classList.add('active');
        p1.classList.remove('active')
    }
}

playAgain.onclick = () => {
    location.reload();

}


const reset = document.querySelector(".reset")


reset.onclick = () => {
    // cellElements.Array(9).fill(null);
    cellElements.forEach(cells => {
        if (cells.classList.contains("X")) {
            cells.classList.remove("X");
        } else if (cells.classList.contains("O")) {
            cells.classList.remove("O");
        }
        cells.classList.remove('disable');
        cells.innerText = '';
        // cells.classList.contains(currentPlayer);

    })

}





// const music = document.getElementById('music_check');




function sound_play_pause() {
    if (s == 1) {
        clicktone.pause();
        return s = 0;
    } else {
        clicktone.play();
        return s = 1;
    }
}

let setting = document.querySelector('.setting')

function show_hide() {
    if (setting.style.display == "block") {
        setting.style.display = "none";

    } else {
        setting.style.display = "block"

    }
}