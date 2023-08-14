# This is an example of python code for modeling domain and problem PDDL files for "Tower of Hanoi".

from pddl.logic import Predicate, constants, variables
from pddl.core import Domain, Problem, Action, Requirements
from pddl.formatter import domain_to_string, problem_to_string

# set up variables and constants
x, y, disc, fro, to = variables("x y disc from to")
peg1, peg2, peg3, d1, d2, d3, d4, d5 = constants("peg1 peg2 peg3 d1 d2 d3 d4 d5")

# define predicates
clear = Predicate("clear", x)
on = Predicate("on", x, y)
smaller = Predicate("smaller", x, y)

# define actions
move = Action(
    "move",
    parameters=[disc, fro, to],
    precondition=smaller(to, disc) & on(disc, fro) & clear(disc) & clear(to),
    effect=clear(fro) & on(disc, to) & ~on(disc, fro) & ~clear(to)
)

# define the domain object.
requirements = [Requirements.STRIPS]
domain = Domain(
    "hanoi_domain",
    requirements=requirements,
    predicates=[clear, on, smaller],
    actions=[move]
)
print("DOMAIN START") # Do not remove! Required for correct parsing.
print(domain_to_string(domain)) # Do not remove! Required for correct parsing.
print("DOMAIN END") # Do not remove! Required for correct parsing.

# define the problem object.
problem = Problem(
    "hanoi_problem",
    domain=domain,
    objects=[peg1, peg2, peg3, d1, d2, d3, d4, d5],
    init=[smaller(peg1, d1), smaller(peg1, d2), smaller(peg1, d3), smaller(peg1, d4), smaller(peg1, d5), smaller(peg2, d1), smaller(peg2, d2), smaller(peg2, d3), smaller(peg2, d4), smaller(peg2, d5), smaller(peg3, d1), smaller(peg3, d2), smaller(peg3, d3), smaller(peg3, d4), smaller(peg3, d5), smaller(d1, d1), smaller(d2, d1), smaller(d3, d1), smaller(d4, d1), smaller(d5, d1), smaller(d2, d2), smaller(d3, d2), smaller(d4, d2), smaller(d5, d2), smaller(d3, d3), smaller(d4, d3), smaller(d5, d3), smaller(d4, d4), smaller(d5, d4), clear(peg2), clear(peg3), clear(d1), on(d5, peg1), on(d4, d5), on(d3, d4), on(d2, d3), on(d1, d2)],
    goal=on(d5, peg3) & on(d4, d5) & on(d3, d4) & on(d2, d3) & on(d1, d2)
)
print("PROBLEM START") # Do not remove! Required for correct parsing.
print(problem_to_string(problem)) # Do not remove! Required for correct parsing.
print("PROBLEM END") # Do not remove! Required for correct parsing.
