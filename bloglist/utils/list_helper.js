const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((a, c) => a += c.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, c) => c.likes > a.likes ? c : a);
}

const mostBlogs = (blogs) => {        
    const {author, count} = most(blogs, x => 1);
    return {author, blogs:count};
}

const mostLikes = (blogs) => {    
    const {author, count} = most(blogs, x => x.likes);
    return {author, likes:count};
}

const most = (blogs, tallyCounter) => {
    const tally = (acc, x) => {
        const count = tallyCounter(x);
        acc[x.author] = acc[x.author] ? acc[x.author]+count : count;
        return acc;
    }

    const r = blogs.reduce(tally, {});

    let best;
    for(const x in r){
        const obj = { author:x, count:r[x] };
        best = best && best.count > obj.count ? best : obj;
    }    
    return best;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}