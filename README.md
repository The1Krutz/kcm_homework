# Vue Teleprompter Application

Homework assignment for Keeping Current Matters

## Deliverables

1. Instructions on how to run the application
   1. a
   2. b
   3. c
2. Brief explanation of your approach and any challenges you encountered
   1. First problem encountered: I've never used Vue before. I used `npm create vue@latest` from the [Vue quickstart](https://vuejs.org/guide/quick-start.html) documentation to create a basic starter app.
   2. Created a few skeleton components to get started. Wired up some simple data and control
   3. First worked on getting the scrolling teleprompter working since that seemed like the hardest part
      1. Started with a format of parsing the script into word tokens and scrolling to each word at a set rate.
   4. Got the events flowing between controls, prompter, and status log
   5. Last major hurdle was parsing the script into the token format from earlier. For pure data manipulation like this, I find it easier to work with tests, so I wrote a simple test case.
      1. This exposed that my original sample data hadn't included enough variation, so now I had a couple edge cases to cover. ie: line breaks between sections, script tags with extra data, etc
   6. After that, I started cleaning up any leftover debug code. css borders, console logs, etc
3. If you use AI assistance, provide a link to the AI chat or a copy of the chat history
   1. No AI assistance.
