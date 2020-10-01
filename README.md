# Sublime Backend Coding Challenge

## Problem & Approach
- The main technical problem presented was to build an API that would process & analyze incoming message data, run a set 
of queries against the contents of the message, store it in a way that was easily searchable in the future, and generate
events that could be consumed by an outside listener to get notified about the results of the searches.

- I chose to create a NestJS service, backed by an ElasticSearch instance running inside of a Docker container, since NestJS
provides easy to use REST functionality out of the box, and would make scaffolding the API easier, and ElasticSearch
has robust indexing and searching capabilities that allow this data to be stored in a highly queryable format.

- I was initially contemplating building my own data model on top of either Postgres or DynamoDB, but I decided that
an existing platform that was tailored to this type of problem would provide much more robust searching capabilities.

- *Unfortunately, I did not get to the event generation portion of the challenge, but I would likely have chosen a 
simple SQS queue for that, as the messaging requirements presented here were pretty straightforward.*

- With the way the system is currently implemented, the backing ElasticSearch datastore is almost certainly going to 
be the primary bottleneck in the scaling of the system, ans the APIs are *mostly* pass-throughs, with a bit of data
manipulation and transformation. I don't have production experience with ElasticSearch (this was actually my first
hands on experience with it), so I can't say from experience how well it scales, but *in theory*, it is a very 
horizontally scalable system, which can give the system quite a bit of operational runway. 

- The amount of data being passed around is also a concern that may arise as the system scales—the MDM format is pretty robust and has a lot of 
information, but that also means there's a lot of data being fed into the API, and from the API into the database. I think
in a practical application, we might want to explore more compact serialization protocols, like protobufs/gRPC, or at the 
least compress the JSON data as we pass it around.
