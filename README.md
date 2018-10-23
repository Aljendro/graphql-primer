# GraphQL Primer

The purpose of this repository is the guide a beginner through
setting up a GraphQL schema on some endpoint. The endpoint environment
here happens to be a lambda; it does not really matter what you choose.
It also happens to be node.js, but it does not matter the technology
(its just a detail at the this point anyway).

## Setup

Make sure you have [node 8.10.x](https://nodejs.org/en/) installed on your machine.

Clone the repo
```
git clone https://github.com/Aljendro/graphql-primer.git
```

Install the depedencies
```
npm install
```

Run the lambdas locally
```
npm start
```

## Navigating the Project

Some of the key events within the project are tagged with annotations.

List the "chapters"
```
git tag --list
```

Compare the difference between "chapters". This gives you the sense of
what has changed between chapters.
```
git diff 1_setup_schema 2_student_entity
```

OR

Compare the differences between commits.
```
git diff <sha1> <sha2>
```

