// Challenges are stored in this function.
// 1 means all players.
function original_list() {
    const c_list = []

    c_list.push(['Pick one challenge from the following three to another player:', '0'])
    c_list.push(['When you find evidence, you cannot tell about it to other players', '1'])
    c_list.push(["When you find the ghost room, you cannot leave until the ghost type is found", '2'])
    c_list.push(['No crucifix', '1'])
    c_list.push(['No running', '0'])
    c_list.push(['No breaker', '1'])
    c_list.push(['No lights on', '1'])
    c_list.push(['No sanity pills', '0'])
    c_list.push(['No flashlight', '0'])
    c_list.push(['No hiding during a hunt', '0'])
    c_list.push(["When you go inside the house, you cannot leave", '0'])
    c_list.push(['Crouching through the whole game', '0'])
    c_list.push(['Every player can choose only 10 pieces of equipment', '1'])
    c_list.push(['Every player can choose only 5 pieces of equipment', '1'])
    c_list.push(['Only starter items', '1'])
    c_list.push(['Sanity 0%', '0'])
    c_list.push(['Finish all objectives', '1'])
    c_list.push(['Take a picture of the ghost during a hunt', '0'])
    c_list.push(['For every toy or book brought into the truck, you can bring one piece of equipment in the house', '0'])
    c_list.push(['There can be only 3 pieces of equipment in the house simultaneously (excluding flashlights)', '1']) 
    c_list.push(['Every sentence you say must start with the name of the ghost', '0'])
    c_list.push(['Every time you get back to the truck, you must bring one item from the house', '0'])
    c_list.push(['You can only use glow-sticks for fingerprints', '1'])
    c_list.push(['When the hunt starts, turn your flashlight off', '0'])
    c_list.push(['Find the ghost using only sensors', '1'])

    return c_list;
}

// Method to initialize challenge arrays
// Argument arr, that defines which array to return - solo, player choice challenge or the basic array.
function challenge_list(arr) {
    const original = original_list()
    const challenges = []
    const values = []

    for (const element of original) {
        challenges.push(element[0]);
        values.push(element[1])
    }
    if (arr === 'solo') {
        const solo_challenges = challenges
        solo_challenges.splice(0, 3); 
        return solo_challenges

    } else if (arr == 'values') {
        return values

    } else if (arr === 'players') {
        const choose_challenge = [];
        const challenges_temp = original
        challenges_temp.shift()

        for (let i = 1; i < challenges_temp.length - 1; i++) {
            if (challenges_temp[i][1] == '0'){
                choose_challenge.push(challenges_temp[i][0])
            }              
        }
        return choose_challenge
    } else {
        return challenges
    }  
}

// Function to get a random challenge, except for solo players (see )
// If the random challenge is "Pick three challenges", it also returns those three random challenges.
// Also html elements containing challenges are updated.
function random_challenge(arr) {
    const values = challenge_list('values')
    var rand = Math.floor(Math.random() * (arr.length) + 0)

    if (rand === 0 && get_players().length !== 1) {
        var chal3_list = three_challenges()
        var chal3_text = "- " + chal3_list[0] + " <br> - " + chal3_list[1] + " <br> - " + chal3_list[2]
        document.getElementById("player-challenges").innerHTML = chal3_text  
        document.getElementById("players").innerHTML = "Players: " + random_player(get_players(), 0)
        return arr[rand]

    } else if (get_players().length < 2) {
        document.getElementById("players").innerHTML = "Players: You are on your own!"
        return arr[rand]
    } else if (rand !== 0){
        if (values[rand] == 1) {
            document.getElementById("players").innerHTML = "Players: All players" 
            return arr[rand]  

        }else if (values[rand] == 2){ 
            document.getElementById("players").innerHTML = "Players: Any player" 
            return arr[rand]  
        } else {
            document.getElementById("players").innerHTML = "Players: " + random_player(player_combinations(get_players()))
            return arr[rand]  
        } 
    } else {
        arr.shift()
        return arr[rand]
    } 
}

// Returns three random challenges for the "Pick three challenges" - challenge.
function three_challenges() {
    const challenges = []
    while (challenges.length < 3) {
        var chal3 = random_challenge(challenge_list('players'))
        if (challenges.includes(chal3) === false) {
            challenges.push(chal3)
        }
    }  
    return challenges
}

// Returns a random player from the list. 
// If the argument all is 0, it returns a player for the "Pick three challenges" - challenge.
// This is because that certain challenge can be given to one person only.
function random_player(players, all) {
    var rand = Math.floor(Math.random() * (players.length) + 0)
    if (rand === players.length-1 && all !== 0) {
        return "All players"
    } else { 
        return players[rand]   
    }    
}

// Initializes an array of all possible player combinations.
function player_combinations (players) {

    const combinations = []
    let temp = []
    var pow_len = Math.pow(2, players.length)

    for (var i = 0; i < pow_len; i++)
    { 
        temp = []
        for (var j = 0; j < players.length; j++)
        {
            if ((i & Math.pow(2, j)))
            {
                temp.push(players[j])
            }
        }
        if (temp.length > 0)
        {
            combinations.push(temp)
        }
    }

    combinations.sort((a, b) => a.length - b.length)
    return combinations
}

// It is not good practise to initialize this here, but otherwise the get_players()-method won't work otherwise
var players_list = []

// Getting the players from the input field.
// Updating text fields.
function get_players() {
    document.getElementById("rules").innerHTML = ""
    document.getElementById("info").innerHTML = ""
    document.getElementById("players").innerHTML = "" 
    document.getElementById("challenge").innerHTML = "" 

    var player_name = document.getElementById("player-names")
    
    if (players_list.length < 4) {
        var x = player_name.value
        var length = 3- players_list.length
        if (x !== "") {
            players_list.push(" " + x.toLowerCase())
            document.getElementById("player-amount").innerHTML = `You can still add ${length} more players.`
        }     
        player_name.value = ""
    } 

    if (players_list.length < 1) {
        document.getElementById("player-amount").innerHTML = 'Empty name field!'

    } else if (players_list.length > 3) {
        document.getElementById("player-amount").innerHTML = 'Player list is full now!'
        document.getElementById("curr-players").innerHTML = `Current players ${players_list}`
        document.getElementById("player-names").value = null
    } else {
        document.getElementById("curr-players").innerHTML = `Current players ${players_list}`
    }
    return players_list
}

window.onload = function() {
    document.getElementById("add-button").addEventListener("click", get_players);
};

function get_challenge() {
    document.getElementById("player-challenges").innerHTML = ""
    if (get_players().length < 1) {
        document.getElementById("challenge").innerHTML = "Add players first!"    
    }else if (get_players().length < 2) {
        document.getElementById("challenge").innerHTML = "Challenge: <br> " + random_challenge(challenge_list('solo'))    
    } else {
        document.getElementById("challenge").innerHTML = "Challenge: <br> " + random_challenge(challenge_list())      
    }   
    document.getElementById("player-amount").innerHTML = ""
    document.getElementById("curr-players").innerHTML = ""
    
}
