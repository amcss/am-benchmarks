# AM Benchmarks

By far the most common question for AM's heavy use of attribute selectors (in particular the `~=` selector) has been:

> Wow, what a neat idea. This would solve a lot of my day to day problems writing CSS. You must be some kind of genius to come up with this. And so attractive! What a combo! Hey, what are you doing later?
>
> ALSO I WILL NEVER USE AMCSS BECAUSE IT'S PROBABLY SLOW KTHX

This surprised us, since selector performance hasn't been a real concern in our day-to-day work for a while. Front-end performance is a ***huge*** deal, of course, but CSS selectors appear to contribute such a minuscule amount to the total page load time that it didn't occur to us that it might be a major concern to many people.

So, what's the best way to alleviate those concerns? **REAL DATA**

![Jake's excited too](http://media.tumblr.com/5e829faafb14759c51d20dae54525c29/tumblr_inline_n9n5pwrMLP1r0ztiw.gif)

## Goals

Here's what I've tried to optimise for:

* Repeatable - needs to be able to be run 100s of times with as consistent results as possible.
* Targeted - needs to be showing variations in performance due to *attribute selectors* v *class selectors*, not from any other sources.
* Realistic - needs to reflect real-world use-cases (live production sites if possible)
* Proportional - should reflect the fact that CSS selectors contribute a small amount to total load time.

## Methodology

> Sucking at something is the first step at being sorta good at something

This is a first attempt, so there may be other ways to achieve these goals. But this seems to be working pretty well:

* Fetch an arbitrart HTML page
* Fetch all CSS included on that page
* Rewrite the CSS & HTML to be AM-style (super naïvely)
* Send it on down to the browser
* See how fast it renders

In practice, a couple of things make sense:

* Inline the CSS into the HTML: makes the response from the server much simpler, and reduces variability based on network conditions.
* Strip out `<script>` tags: again, for simplicity. This sorta excludes fully JS-rendered apps, but there are enough sites out there to get data from so ¯\_(ツ)_/¯
* Cache it all to hell: use a CDN so the tests are hitting cached versions of these pages from edge locations close to the test box - eliminates server processing time and reduces variability due to network performance.

So that's what I've done. Read the source of this repo for how it all works.

## YAYAGOGOGO

If you want to see it in action, look at these use cases:

* Boostrap's landing page *
- http://am-benchmark.glenmaddern.com/classes/http://getbootstrap.com
- http://am-benchmark.glenmaddern.com/attributes/http://getbootstrap.com
- http://am-benchmark.glenmaddern.com/values/http://getbootstrap.com

The first, `classes`, is the same server but doesn't change the HTML/CSS at all. So that's our control. The second, `attributes`, does this:

```diff
- <div class='btn btn-small btn-primary'>
+ <div am-btn am-btn-small am-btn-primary>

- .btn { /* styles */ }
+ [btn] { /* styles */ }
```

It's naïve, as I said, so it's not the way AM would actually be written, but it should be enough to show the performance of the attribute selector versus the class selector.

The final option, `values`, uses the `~=` selector much more heavily. It replaces:

```diff
- <div class='btn btn-small btn-primary'>
+ <div am-klass='btn btn-small btn-primary'>

- .btn { /* styles */ }
+ [am-klass~='btn'] { /* styles */ }
```

Again, this markup is dumb as a plank, but will be enough to show how much *total reliance* on the `=~` selector changes your site's performance. Here are some other demo sites:

* Facebook's landing page when you don't bother with a User-Agent *
- http://am-benchmark.glenmaddern.com/classes/http://facebook.com
- http://am-benchmark.glenmaddern.com/attributes/http://facebook.com
- http://am-benchmark.glenmaddern.com/values/http://facebook.com

* New York Times homepage *
- http://am-benchmark.glenmaddern.com/classes/http://nytimes.com
- http://am-benchmark.glenmaddern.com/attributes/http://nytimes.com
- http://am-benchmark.glenmaddern.com/values/http://nytimes.com

## Results

WIP. Currently setting up a way to run, say, 100 tests on all three variants of a website, then collate and compare the results.

In the mean time, here's a GIF:

![JAAAAAMES BAXTER](http://i.imgur.com/sMNudhu.gif)