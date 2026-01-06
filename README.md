[Link to view this](https://lintalou.github.io/Battleship/)  
[Link to the Odin page](https://www.theodinproject.com/lessons/node-path-javascript-battleship)

About Github Pages, I just copied the stuff from src to docs because apparently you can't specifiy your own source folder and "docs" was the only option. I did it this way because it's simple.

It tooks me over the span of 2 months to finish this project (if you look at the initial commit date), this is because I don't work on this everyday. When I do work on it the time spent range from 1 to 4 hours, makes sense since this isn't a job.

There's one method that I didn't wrote a test for in the GameBoard class there, the "populate" method. This is because I'm too occupied thinking about its implementation that I didn't think about writing tests, not that I'd like to write the test for it.

There's also the coordinate stuff, it's pretty messy. I would clean it up if I want to work on this more.

If you don't know what this game is about, it's basically a guessing game. If you guess all the right squares first you win (the squares on the right board). Here you play with an "A.I" which in this case is made up of if and else. It's pretty much impossible to lose once you know the placement pattern.

I also just use Math.random() for all the parts that need randomness. Should be good enough, not that I have any idea how to implement my own.