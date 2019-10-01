const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', ()=> {
    const listWithOneBlog = [{
        likes:5
    }];

    test('one blog has equal likes', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
});

describe('favorite blog', ()=> {
    const listWithTwoBlogs = [
        {
            likes:12
        },
        {
            likes:15
        }];

    test('favorite blogs has most likes', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs);
        expect(result).toBe(listWithTwoBlogs[1]);
    });
});