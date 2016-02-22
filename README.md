## Background

One of our engineering challenges at NoRedInk is deciding performantly how to show students the right mix of content.  By choosing the right cross-section of content we can ensure that:
  1.  Students achieve content mastery in the least amount of time, and
  2.  Students don't get bored with the same questions.

We base our decision on a number of factors:
  * Student ability
  * Questions students have already seen
  * Pedagogical hierarchy
    ...and more

We have simplifed this problem so that you can actually get something done in a few hours.

## Ruby Take-Home Challenge

You have 2 hours to code a solution to the following challenge.

We are providing you with two csv files:

`questions.csv` and `usage.csv`

The `questions.csv` file contains a mini-taxonomy.  This taxonomy consists of __Strands__, __Standards__, and __Questions__.  Strands have many Standards, and Standards have many Questions. Questions have a difficulty rating between 0 and 1, where 1 means everyone always gets the question correct, and 0 means no one ever does.

The `usage.csv` file contains the relevant student usage.  Each row describes a single student seeing and possibly answering a single question. Questions are first assigned to the student, and then at a later time, the student may answer the question.

We would like you to write a program in ruby to select questions for a quiz. Please feel free to use any libraries you choose.

### Basic Requirements
* The program should prompt the user for the number of questions to put in the quiz. Any integer value greater than 0 is acceptable.
* The expected output is to display a list of question_ids
* Use each strand as close as possible to an equal number of times. (e.g. There are two strands, so if the user asks for a 3 question quiz, it's okay to choose one strand twice and the other once.)
* Use each standard as close as possible to an equal number of times.
* Duplicating questions in the quiz is OKAY!
* Not completing the basic requirements IS NOT FAILURE.  We'd rather see a beautiful attempt than a complete attempt.
* Please use git to track progress. E.g. progressively commit changes so we can track your thought process.

### Bonus Requirements
Choose any or all of the following, time permitting:
* Order the questions in the quiz from easiest to hardest
* Prefer questions that students have not answered.
* Prefer questions that students have not been assigned.
* Group the questions by standard, and then order the questions within each standard by difficulty (easiest to hardest)

### General Guidelines
* This is not an assessment of your front-end prowess. Function over form.
* You only have two hours. Take shortcuts, but leave real solution in comments. If you have enough time at the end, you can go back and make your solution less ugly.
* You will be assessed on both how well your function works, and how well your code reads.

##### Finally:  a tip (or, maybe a challenge!):
* If you're about to begin, and you think to yourself: "I think I should use rails!" then you should know that nobody who has ever gone down that rabbit hole has ever succeeded. THERE BE DHHRAGONS!

-[Good luck!](https://s3-us-west-2.amazonaws.com/static.noredink.com/stan-carey-doge-meme-wow-such-win-because-grammar-so-amaze-much-usage-very-language.jpg)

