export const authorized = [] 
// for unauthorized client testing 
// Authorized:
// ["206908148957708288","198752832491356160","315236783858384897","275542459679899649"]

/**
 * Map of all id(values) got with token(key) from discord API
 * Map<discordToken, id>
 */
export const discordTokens = new Map()


/**
 * Map of tokens generated for each id
 * Map<id, localAPIToken>
 */
export const tokens = new Map()

/**
 * Function that returns array of tokens with no id... so, why did i add id there?
 */
export const tokensArray = () => Array.from(tokens.values())