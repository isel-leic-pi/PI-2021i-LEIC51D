const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']


words.forEach(console.log)


// Show in console the length of all words with more than 5 chars

words.filter(str => str.length > 5).map(str => str.length).forEach(console.log)