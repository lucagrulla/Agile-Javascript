function Arg(){}

function TypeArg(type) {
    this.expectedType = type;

    this.toString = function() {
        return type.name;
    }
}

function FunctionArg(predicate) {
    this.predicate = predicate;
}

function PropertiesMatch(expected) {
    this.expectedValues = expected;
}

Arg.isA = function(type) {
    return new TypeArg(type);
};

Arg.satisfies = function(predicate) {
    return new FunctionArg(predicate);
};

Arg.sameAs = function(expected) {
    return new PropertiesMatch(expected);    
};

function ArgumentMatcher() {
    var typeMatchers = {};

    initMatchers();

    this.areEqual = function(expected, actual) {
        if (expected.length != actual.length) {
            return false;
            
        }
        return checkArguments(expected, actual);
    };

    function initMatchers() {
        typeMatchers[Array] = matchArrays;
        typeMatchers[TypeArg] = matchType;
        typeMatchers[FunctionArg] = matchPredicate;
        typeMatchers[PropertiesMatch] = matchProperties;
    }

    function checkArguments(expected, actual) {
        if (expected == null) {
            return actual == null;    
        }

        var typeMatcher = typeMatchers[expected.constructor] || matchObjects;

        return typeMatcher(expected, actual);
    }

    function matchArrays(expected, actual) {
        if ((expected && !actual) || (!expected && actual)) {
            return false;
        }

        if (expected.length != actual.length) {
            return false;
        }

        for (var i = 0; i < expected.length; i++) {
            if (!checkArguments(expected[i], actual[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObjects(expected, actual) {
        return expected == actual;
    }

    function matchType(expected, actual) {
        return expected.expectedType === actual.constructor;
    }

    function matchPredicate(expected, actual) {
        return expected.predicate(actual);
    }

    function matchProperties(expected, actual) {
        for (var propertyName in expected) {
            if (expected["propertyName"] != actual["propertyName"]) {
                return false;
            }
        }

        return true;
    }
}
function Discrepancy(message) {
    this.getMessage = function() {
        return message;
    }
}
function DynamicExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);
    };

    this.verify = function() {
        return checkExpectations();
    };

    function checkExpectations() {
        var discrepancy = null;

        for (var i = 0; i < expectedCalls.length; i++) {
            var expectedCall = expectedCalls[i];

            var matchingCalls = MockHelper.findAll(actualCalls, function(actualCall) {
                return expectedCall.equals(actualCall);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Expected call '" + expectedCall.toString() + "' not executed");
                break;
            } else if (matchingCalls.length !== expectedCall.getRepeats()) {
                discrepancy = new Discrepancy("Expected " + expectedCall.getRepeats() + " call(s) to '" + expectedCall.toString() + "', found " + matchingCalls.length);
                break;
            }
        }

        return discrepancy;
    }
}
function FrameworkIntegration() {
    this.fail = function(discrepancy) {
        fail(discrepancy.getMessage());
    };

    this.pass = function(discrepancy) {
    }
}
function InvocationBehaviour(caller, method, args) {
    var repeatCount = 1;

    this.getCaller = function() { return caller };
    this.getMethod = function() { return method };
    this.getArgs = function() { return args; };

    this.setRepeats = function(count) {
        repeatCount = count;
    };

    this.getRepeats = function() {
        return repeatCount;
    };

    this.equals = function(other) {
        var argumentMatcher = new ArgumentMatcher();

        return caller == other.getCaller() &&
               method === other.getMethod() &&
               argumentMatcher.areEqual(args, other.getArgs());
    };

    this.toString = function() {
        var toStr = caller + "." + method;

        if (args.length !== 0) {
            toStr = toStr + "(" + formatArgs() + ")";
        }else {
            toStr = toStr + "()";
        }

        return toStr;
    };

    function formatArgs() {
        var toStr = "";

        for (var i = 0; i < args.length; i++) {
            if (typeof(args[i]) === 'string') {
                toStr += "'" + args[i] + "', ";
            } else {
                toStr += args[i] + ", ";
            }
        }

        return toStr.substring(0, toStr.lastIndexOf(","));
    }
}
function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();
    var mockInitialiser = new MockInitialiser();
    var mocks = [];

    this.createDynamicMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initDynamicMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initDynamicMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.createStrictMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initStrictMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initStrictMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.verify = function() {
        for (var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];
            var discrepancy = mock.verify();

            if (discrepancy != null) {
                framework.fail(discrepancy);
            }
        }

        framework.pass();
    };
}
function MockHelper() {}

MockHelper.isPublicMethod = function(object, method) {
    return typeof object[method] === 'function';
};

MockHelper.find = function(array, predicate) {
    var returnValues = [];

    for (var i = 0; i < array.length; i++) {
        var currentItem = array[i];

        if (predicate(currentItem)) {
            return currentItem;
        }
    }

    return null;
};

MockHelper.findAll = function(array, predicate) {
    var returnValues = [];

    for (var i = 0; i < array.length; i++) {
        var currentItem = array[i];

        if (predicate(currentItem)) {
            returnValues.push(currentItem);
        }
    }

    return returnValues;
};

MockHelper.convertToArray = function(arguments) {
    var convertedArguments = [];

    for (var i = 0; i < arguments.length; i++) {
        convertedArguments[i] = arguments[i];
    }

    return convertedArguments;
};

MockHelper.nextOrLast = function(values) {
    if (values.length === 1) {
        return values[0];
    }

    return values.shift();
};
function MockInitialiser() {
    this.initStrictMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, true);
    };

    this.initDynamicMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, false);
    };

    function initMock(mock, thingToMock, strict) {
        backupOriginalFunctions(mock, thingToMock);
        addStateVariables(mock, strict);
        replaceFunctions(mock, thingToMock);
        addApiFunctions(mock, thingToMock, strict);

        return mock;
    }

    function addStateVariables(mock, strict) {
        mock.recording = false;
        mock.beingTold = false;
        mock.lastMockedBehaviour = null;
        mock.calls = {};
        mock.expectationMatcher = strict ? new StrictExpectationMatcher() : new DynamicExpectationMatcher();
    }

    function backupOriginalFunctions(mock, thingToMock) {
        mock.originalFunctions = {};

        for (var method in thingToMock) {
            mock.originalFunctions[method] = thingToMock[method];
        }
    }

    function replaceFunctions(mock, thingToMock) {
        if (typeof(thingToMock) == 'function') {
            createMethods(thingToMock, mock);
            createMethods(new thingToMock(), mock);
        }else if (typeof(thingToMock) == 'object') {
            createMethods(thingToMock, mock);
        }else {
            throw new Error("Cannot mock out a " + typeof(thingToMock));
        }
    }
    
    function addApiFunctions(mock, thingToMock, strict) {
        mock.expects = expects;
        mock.toReturn = toReturn;
        mock.toReturnNext = toReturnNext;
        mock.toThrow = toThrow;
        mock.toExecute = toExecute;
        mock.verify = verify;
        mock.once = once;
        mock.twice = twice;
        mock.threeTimes = threeTimes;
        mock.verify = verify;
        mock.restoreOriginalFunctions = restoreOriginalFunctions;
        mock.removeAddedApi = removeAddedApi;

        if (!strict) {
            mock.tells = tells;
        }

        mock.toString = function toString() {
            return thingToMock.name || typeof(thingToMock);
        }
    }

    function createMethods(object, mock) {
        for (var property in object) {
            if (MockHelper.isPublicMethod(object, property, mock)) {
                createMethod(property, mock);
            }
        }
    }

    function createMethod(method, mock) {
        var mockedFunction = function() {
            if (mock.recording) {
                mock.recording = false;
                mock.lastMockedBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                mock.expectationMatcher.addExpectedMethodCall(mock.lastMockedBehaviour);

                return this;
            } else if (mock.beingTold) {
                mock.beingTold = false;
                mock.lastMockedBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                return this;
            } else {
                var actualMethodBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                mock.expectationMatcher.addActualMethodCall(actualMethodBehaviour);

                var methodCalls = mock.calls[method];

                if (methodCalls !== undefined) {
                    var argumentMatcher = new ArgumentMatcher();

                    var result = MockHelper.find(methodCalls, function(result) {
                        return argumentMatcher.areEqual(result.args, actualMethodBehaviour.getArgs());
                    });

                    if (result != null) {
                        return result.action.apply(this, arguments);
                    }
                }
            }
        };

        mockedFunction.name = method;
        mock[method] = mockedFunction;
    }

    function initialiseCallArray() {
        if (this.lastMockedBehaviour == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        var methodName = this.lastMockedBehaviour.getMethod();
        
        if (this.calls[methodName] === undefined) {
            this.calls[methodName] = [];
        }
    }

    function expects() {
        this.recording = true;
        return this;
    }

    function tells() {
        this.beingTold = true;

        return this;
    }

    function toReturn(valueToReturn) {
        this.toExecute(function() { return valueToReturn; });
    }

    function toReturnNext(valuesToReturn) {
        this.toExecute(function() {
            if (valuesToReturn.length == 1) {
                return valuesToReturn[0];
            }
            return valuesToReturn.shift();
        });
    }

    function toThrow(error) {
        this.toExecute(function() { throw error; });
    }

    function toExecute(closure) {
        if (typeof closure !== 'function') {
            throw Error("Value passed to stub call needs to be a function");
        }

        initialiseCallArray.apply(this, arguments);

        this.calls[this.lastMockedBehaviour.getMethod()].push({
            args : this.lastMockedBehaviour.getArgs(),
            action : function() { return closure.apply(this, arguments); }
        });
    }

    function verify(){
        var verificationSuccessful = this.expectationMatcher.verify();

        this.removeAddedApi();
        this.restoreOriginalFunctions();

        return verificationSuccessful;
    }

    function once() {
        this.lastMockedBehaviour.setRepeats(1);

        return this;
    }

    function twice() {
        this.lastMockedBehaviour.setRepeats(2);

        return this;
    }

    function threeTimes() {
        this.lastMockedBehaviour.setRepeats(3);

        return this;
    }

    function restoreOriginalFunctions() {
        for (var method in this.originalFunctions) {
            this[method] = this.originalFunctions[method];
        }

        delete this.originalFunctions;
        delete this.restoreOriginalFunctions;
    }

    function removeAddedApi() {
        delete this.recording;
        delete this.beingTold;
        delete this.lastMockedBehaviour;
        delete this.calls;
        delete this.expectationMatcher;

        delete this.expects;
        delete this.toReturn;
        delete this.toReturnNext;
        delete this.toThrow;
        delete this.toExecute;
        delete this.verify;
        delete this.once;
        delete this.twice;
        delete this.threeTimes;
        delete this.verify;
        delete this.removeAddedApi;
        delete this.tells;
        delete this.toString;
    }
}
function StrictExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];
    var dynamicExpectationMatcher = new DynamicExpectationMatcher();

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addExpectedMethodCall(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addActualMethodCall(invocationBehaviour);
    };


    this.verify = function() {
        var discrepancy = checkForUnexpectedCalls();

        if (!discrepancy) {
            discrepancy = dynamicExpectationMatcher.verify();
        }

        return discrepancy;
    };

    function checkForUnexpectedCalls() {
        var discrepancy = null;

        for (var i = 0; i < actualCalls.length; i++) {
            var actualCall = actualCalls[i];

            var matchingCalls = MockHelper.findAll(expectedCalls, function(expectedCall) {
                return expectedCall.equals(actualCall);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Unexpected call '" + actualCall.toString() + "' found");
                break;
            }
        }

        return discrepancy;
    } 
}
