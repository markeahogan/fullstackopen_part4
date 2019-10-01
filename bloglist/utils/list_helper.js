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
    const tally = (acc, x) => {
        acc[x.author] = acc[x.author] ? acc[x.author]+1 : 1;
        return acc;
    }

    const r = blogs.reduce(tally, {});

    let best;
    for(const x in r){
        const obj = { author:x, blogs:r[x] };;
        best = best && best.blogs > obj.blogs ? best : obj;
    }    
    return best;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}