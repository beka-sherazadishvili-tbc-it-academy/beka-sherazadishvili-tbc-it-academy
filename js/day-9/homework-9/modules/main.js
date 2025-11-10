import multiply, { add, subtract } from "./math.js";
import reverse, { toUpper, toLower } from "./text.js";
import errorMessage, { infoMessage,  } from "./logger.js";

infoMessage(multiply(2, 3));
infoMessage(add(2, 3));
infoMessage(subtract(3, 2));

infoMessage(reverse('abc'));
infoMessage(toUpper('abc'));
infoMessage(toLower('ABC'));

errorMessage('error')