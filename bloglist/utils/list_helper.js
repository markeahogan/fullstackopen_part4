const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((a, c) => a += c.likes, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, c) => c.likes > a.likes ? c : a);
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}