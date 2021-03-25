---
title: How to Backfill Dates in a Pandas Dataframe
categories:
  - how-tos
tags:
  - data
  - python
  - pandas
date: 2021-02-24T22:10:09-05:00

toc: true
toc_label: Table of Contents
toc_icon: cog
toc_sticky: true

author-profile: true
---
### Needless Introductory Exposition
In this tutorial, we'll walk through how you might backfill dates. Imagine you find yourself in one of those heated arguments with your partner that is bred from too much familiarity and comfort and a human's natural propensity for a bit of dramatic spice: how often you clean the dishes. You swear you clean the dishes at least .749 times a day (you are an engineer, after all, and thus prone to making wildly precise claims). The problem is that your dish cleaning database (again, who doesn't have a raspberry pi plugged in somewhere running one of those?) only logs a timestamped record when you do the dishes, so despite your best efforts, there are days missing. You might say, let me count up all the times I've actually done the dishes and divide by days. You might say, I did the dishes on Monday, on Thursday, then on Sunday, then again on Tuesday, Wednesday, and Thursday. 6 times in 14 days might give you a percentage, but what if you wanted a trend line? What if you wanted to count the days you *didn't* do the dishes? What if you wanted to count odd days, or the second Tuesday of every month? Get the idea?

Anyway, after the needlessly long preamble (science says we learn better with a story, they just never say if the story needs to be any good), let's see how we might get around the need to physically count anything at all and structure our data in a way to be less date sparse.

### Mocking up the Data

First, let's set up some mock data. This data assumes we have some sort of aggregation function to group up dishes done. Imagine we queried our database like this:

{% include code-header.html %}
``` sql
SELECT
/* we want to strip out time data and just leave the date */
    DATE(timestamp) as timestamp
  , count(dish_cleanings) as dishes_done
FROM dish_cleaning_db
GROUP BY timestamp
```

Here's how we can mock up some data with pandas.

``` python
df = pd.DataFrame({
    'timestamps': pd.to_datetime(
        ['2021-02-15', '2021-02-13',
        '2021-01-24', '2021-01-23', '2021-01-20']
    ),
    'times_dishes_done': [1, 1, 2, 3, 1]
})

print(df.to_markdown(index=False, tablefmt="grid"))
```

This gives us something like this. I'm using a new(ish) pandas method, `to_markdown()` to print this grid. Pretty nice, huh?

```
+---------------------+---------------------+
| timestamps          |   times_dishes_done |
+=====================+=====================+
| 2021-02-15 00:00:00 |                   1 |
+---------------------+---------------------+
| 2021-02-13 00:00:00 |                   1 |
+---------------------+---------------------+
| 2021-01-24 00:00:00 |                   2 |
+---------------------+---------------------+
| 2021-01-23 00:00:00 |                   3 |
+---------------------+---------------------+
| 2021-01-20 00:00:00 |                   1 |
+---------------------+---------------------+
```
**Note**: This data has time data in it, but we can operate on it as a date if we wanted to use the `dt` accessor.
{: .notice--info}

As you can see, despite our best efforts, we are probably nowhere near 0.749 dish cleaning events a day. Again, we could count up the days and do some division and see how close we are, but we aren't in grade school anymore and things are cooler when computers do them (except Skynet, NSA, etc etc.)

### Working with the Data
First, we set the index to the `timestamps` column, which makes our lives easier later, and the timestamp column is acting as our primary key. We'll set `inplace` to `True` so we don't need to assign to a new variable.

``` python
df.set_index('timestamps', inplace=True)
```

Next, we can use the `resample` convenience function to backfill days with the `'D'` argument. There are dozens of other ways to bin the data. You could use `'M'` for months, or `'3T'` for 3 bins. What will happen is between the first and last date within our dataframe, dates will be populated. There is no need for your dataframe to be ordered, either.

**Note**: We chain `mean()` on the end of call. `resample` returns a `Resampler` object that needs some sort of aggregation function. We used `mean()` somewhat arbitrarily here. If there was aggregation happening, then this function call would matter.
{: .notice--info}

``` python
df = df.resample('D').mean()
```

From here, we have a nicely backfilled table of data, and we can do aggregate functions, quietly up in our office where our partner can not see. Let's take a look.

```
+---------------------+---------------------+
| timestamps          |   times_dishes_done |
+=====================+=====================+
| 2021-01-20 00:00:00 |                   1 |
+---------------------+---------------------+
| 2021-01-21 00:00:00 |                 nan |
+---------------------+---------------------+
| 2021-01-22 00:00:00 |                 nan |
+---------------------+---------------------+
| 2021-01-23 00:00:00 |                   3 |
+---------------------+---------------------+
| 2021-01-24 00:00:00 |                   2 |
+---------------------+---------------------+
| 2021-01-25 00:00:00 |                 nan |
+---------------------+---------------------+
| 2021-01-26 00:00:00 |                 nan |
+---------------------+---------------------+
[...]
+---------------------+---------------------+
```
**Note**: If you use the `to_markdown()` convenience function, make sure to omit the `index=False` argument, since we have set the `timestamp` column as the index.
{: .notice--warning}

Now we can run some simple aggregations
``` python
df['times_dishes_done'].mean()
0.333333333
```
Not even close. Luckily we have write privs to the database.

### Handling Duplicate Dates by Aggregation
All right, that's a simple enough use case, but what if we have a dataset with dates that repeat? We now just have a notebook with dates in it, and we need to turn that into a workable dataset. Imagine a single column with dates, each date represents a `dishes_done` event. We need to aggregate the data. Let's mock something up first.

{% include code-header.html %}
``` python
import pandas as pd
import numpy as np


# generate a date range of a week
dates = pd.date_range(start='2021-01-01', periods=7)
# randomly choose 15 items to populate our dataframe
df = pd.DataFrame(
  data=np.random.choice(dates, 15), columns=['timestamps']
)
```

And here is a sample. It'll look different than this because of the `random.choice`. Maybe one day it'd be a fun exercise to calculate the probability that two groups of 15 days picked randomly with repetitions from a 7 day range would be the exact same. As a side note, there is a super interesting paradox called the Birthday paradox which states that in a room of 23 people, there is a 50/50 chance that two of them have the same birthday.

Anyway, here's the data (must have been a pretty rock-n-roll New Years party to push all that dish washing to the 3rd):

```
	timestamps
0	2021-01-05
1	2021-01-04
2	2021-01-03
3	2021-01-07
4	2021-01-07
5	2021-01-04
6	2021-01-03
7	2021-01-03
8	2021-01-06
9	2021-01-01
10	2021-01-01
11	2021-01-02
12	2021-01-01
13	2021-01-03
14	2021-01-03
```

**Note**: `to_markdown` seems to destroy the dates giving you this scientific notation mess.
{: .notice--info}

Now that we have data, it should be a straight shot aggregation to get something we can work with. We can grab a groupby object to just check our counts via the `size()` method, like so:

```python
df.groupby(['timestamps']).size()
```

Or, we could reset the index and turn things into a DataFrame, as such:
```python
df.groupby(['timestamps']).size().reset_index(name='dishes_done')
```

Which gives you something like this:
```
timestamps	dishes_done
0	2021-01-01	3
1	2021-01-02	1
2	2021-01-03	5
3	2021-01-04	2
4	2021-01-05	1
5	2021-01-06	1
6	2021-01-07	2
```

### Adding an Additional Data Point
Fine, we've done it a few different ways, but what if we had another column, a `person`, and we wanted to find out what everyone's average daily dish washing counts were.

This lovely helper function.
``` python
def backfill_dates(df, date_column, id_column):
  return df.set_index(
    [date_column, id_column]
      ).unstack(
    fill_value=0
      ).asfreq(
    'D', fill_value=0
      ).stack().sort_index(level=1).reset_index()
 ```
And there you have it. Now you can prove no one does anywhere near the amount of work they think they do.