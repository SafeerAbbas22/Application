(define (problem example_problem)
    (:domain example_domain)
    (:objects a b c)
    (:init (not (p2 b c)) (p1 a b c))
    (:goal (p2 b c))
)
