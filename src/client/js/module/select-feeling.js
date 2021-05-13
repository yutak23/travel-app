const feeling = [{
    key: 'P+',
    value: 'strong positive',
    icon: './strong_positive.jpg'
}, {
    key: 'P',
    value: 'positive',
    icon: './positive.jpg'
}, {
    key: 'NEU',
    value: 'neutral',
    icon: './neutral.jpg'
}, {
    key: 'N',
    value: 'negative',
    icon: './negative.jpg'
}, {
    key: 'N+',
    value: 'strong negative',
    icon: './strong_negative.jpg'
}, {
    key: 'NONE',
    value: 'without sentiment',
    icon: './none.jpg'
}];

/**
 * i select feeling definition from score_tag
 * @param {string} scoreTag 
 * @returns feeling
 */
export function selectFeeling(scoreTag) {
    const nowFelling = feeling.filter((feel) => feel.key === scoreTag);
    return nowFelling[0];
}