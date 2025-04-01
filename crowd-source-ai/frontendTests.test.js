const add=require('./sum.js')

test('first test',()=>{
    expect(add(2, 5)).toBe(5)
})

// post.action.test.js
const addPostsW_Coordinates = require("crowd-source-ai\src\components\CreatePost.tsx")
describe('addPostsW_Coordinates', () => {
  it('should create a new post with coordinates', async () => {
    const author_name = 'John Doe';
    const content = 'This is a test post';
    const latitude = 37.7749;
    const longitude = -122.4194;
    const imageUrl = 'https://example.com/image.jpg';

    const result = await addPostsW_Coordinates(author_name, content, latitude, longitude, imageUrl);

    expect(result).toHaveProperty('sucess', true);
    expect(result).toHaveProperty('post', expect.objectContaining({
      author_name,
      content,
      latitude,
      longitude,
      image: imageUrl,
    }));
  });
});