class SimpleBKT:
    def __init__(self):
        self.knowledge = {}
        self.p_init = 0.3
        self.p_transit = 0.2
        self.p_slip = 0.1
        self.p_guess = 0.2

    def get_knowledge(self, concept):
        return self.knowledge.get(concept, self.p_init)

    def update(self, concept, correct):
        p_know = self.knowledge.get(concept, self.p_init)

        if correct:
            numer = p_know * (1 - self.p_slip)
            denom = p_know * (1 - self.p_slip) + (1 - p_know) * self.p_guess
        else:
            numer = p_know * self.p_slip
            denom = p_know * self.p_slip + (1 - p_know) * (1 - self.p_guess)

        p_know_given_obs = numer / denom
        p_know_updated = p_know_given_obs + (1 - p_know_given_obs) * self.p_transit

        self.knowledge[concept] = p_know_updated
