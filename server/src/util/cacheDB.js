/**
 * I know this is not real DB but i don't need one. I don't store any passwords or anyting and 
 * everyone can easly get everyone else discord id.
 */

export const authorized = ["206908148957708288","198752832491356160","315236783858384897","275542459679899649"]
// for unauthorized client testing 
// Authorized:
// 

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