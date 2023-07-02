function extractHashtags(content) {
    const hashtags = content.split(' ')
        .filter(hashtag => hashtag.startsWith('#'))
        .map(hashtag => hashtag.substr(1).toLowerCase());

    return hashtags;
}

export default extractHashtags;