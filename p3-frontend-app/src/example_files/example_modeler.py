# This is an example of python code for modeling domain and problem PDDL files.

from pddl.logic import Predicate, constants, variables
from pddl.core import Domain, Problem, Action, Requirements
from pddl.formatter import domain_to_string, problem_to_string

# set up variables and constants
x, y, z = variables("x y z")
a, b, c = constants("a b c")

# define predicates
p1 = Predicate("p1", x, y, z)
p2 = Predicate("p2", x, y)

# define actions
a1 = Action(
    "action_1",
    parameters=[x, y, z],
    precondition=p1(x, y, z) & ~p2(y, z),
    effect=p2(y, z)
)

# define the domain object.
requirements = [Requirements.STRIPS]
domain = Domain(
    "example_domain",
    requirements=requirements,
    predicates=[p1, p2],
    actions=[a1]
)
print("DOMAIN START") # Do not remove! Required for correct parsing.
print(domain_to_string(domain)) # Do not remove! Required for correct parsing.
print("DOMAIN END") # Do not remove! Required for correct parsing.

# define the problem object.
problem = Problem(
    "example_problem",
    domain=domain,
    objects=[a, b, c],
    init=[p1(a, b, c), ~p2(b, c)],
    goal=p2(b, c)
)
print("PROBLEM START") # Do not remove! Required for correct parsing.
print(problem_to_string(problem)) # Do not remove! Required for correct parsing.
print("PROBLEM END") # Do not remove! Required for correct parsing.
