---
title: How to Backfill Dates in a Pandas Dataframe
categories:
  - how-tos
tags:
  - data
date: 2021-02-24T22:10:09-05:00
toc: true
toc_label: Table of Contents
toc_icon: cog
author-profile: true
---
### some exposition
In this tutorial, we'll walk through how you might backfill dates. Imagine you find yourself in one of those heated arguments with your partner that is bred from too much familiarity and comfort and a human's natural propensity for a bit of dramatic spice, how often you clean the dishes. You swear you clean the dishes at least .749 times a day (you are an engineer, after all, and thus prone to making wildly precise claims). The problem is that your dish cleaning database (again, who doesn't have a raspberry pi plugged in somewhere running one of those?) only logs a timestamped record when you do the dishes, so despite your best efforts, there are days missing. You might say, let me count up all the times I've actually done the dishes and divide by days, but honestly, who physically counts things anymore and if you did that, there'd be no need for this story to exist.

Anyway, after the needlessly long preamble (science says we learn better with a story, they just never say if the story needs to be any good), let's see how we might get around the need to physically count anything at all.


### here's where it actually starts

First, let's set up some mock data. This data assumes we have some sort of aggregation function to group up dishes done. Imagine we queried our database like this:

``` sql
SELECT
    DATE(timestamp) as timestamp
  , count(dish_cleanings) as dishes_done
FROM dish_cleaning_db
GROUP BY timestamp
```

Here's how we'd do that with pandas.

``` python
df = pd.DataFrame({
  'timestamps': pd.to_datetime(
    ['2021-02-15','2021-02-13', '2021-01-24',
    '2021-01-23', '2021-01-20']),
  'times_dishes_done':'1 1 2 3 1'.split()
})

print(df.to_markdown(index=False, tablefmt="grid"))
```

This gives us something like this. I'm using a new(ish) pandas method to print this grid. Pretty nice, huh?

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

As you can see, despite our best efforts, we are probably nowhere near 0.749 dish cleaning events a day. Again, we could count up the days and do some division and see how close we are, but we aren't in grade school anymore and things are cooler when computers do them.

First, we set the index to the `timestamps` column, otherwise the next method call won't work. We'll set `inplace` to `True` so we don't need to assign to a new variable.

``` python
df.set_index('timestamps', inplace=True)
```

Next, we can use the `resample` convenience function to backfill days with the `'D'` argument. There are dozens of other ways to bin the data. You could use `'M'` for months, or `'3T'` for 3 bins.

Also, note that we chain `mean()` on the end of call. `resample` returns a `Resampler` object that needs some sort of aggregation function. We used `mean()` here. If there was aggregation happening, then this function call would matter.

``` python
df = df.resample('D').mean()
```

From here, we have a nicely backfilled table of data, and we can do aggregate functions, quietly up in our office where our partner can not see.

``` python
df['times_dishes_done'].mean()
0.333333333
```
Not even close. Luckily we have write privs to the database.

### let's take it up a notch
All right, that's a simple enough use case, but what if we have dates that repeat.

### this is it's final form
Fine, we've done it a few different ways, but what if we had another column, a `person`, and we wanted to find out what everyone's average daily dish washing counts were.

Let's mock up some data.
``` python
```

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