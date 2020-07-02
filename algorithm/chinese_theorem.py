from __future__ import print_function
from functools import reduce
import math


def mod_inverse(b, m):
    ''' Find y: b*y % m = 1 '''
    m0 = m
    q, r = m0 // b, m0 % b
    y0, y = 0, 1
    while r:
        y0, y = y, (y0 - q * y) % m
        m0, b = b, r
        q, r = m0 // b, m0 % b
    return y


def kin_teo(lin_kong):
    ''' Rjesavamo sisteme linearnih kongruencija
    '''
    m_i, r_i = zip(*lin_kong) #razdvaja niz parova na dva niza 
    M = reduce(int.__mul__, m_i, 1)
    M_i = [M // m for m in m_i]
    y_i = [mod_inverse(c, m) for c, m in zip(M_i, m_i)]
    part_kon = [y * c for y, c in zip(y_i, M_i)]
    return M, sum(r * u % M for r, u in zip(r_i, part_kon)) % M


def xeuclid(a, b):
    """ gcd(a,b) = ax + by-
    """
    x = [1, 0]
    y = [0, 1]
    sign = 1

    while b:
        q, r = divmod(a, b)
        a, b = b, r
        x[1], x[0] = q * x[1] + x[0], x[1]
        y[1], y[0] = q * y[1] + y[0], y[1]
        sign = -sign

    x = sign * x[0]
    y = -sign * y[0]
    return a, x, y


def chinese_remainder(a, m):
    """ return x in ' x = a mod m'.
    """
    modulus = reduce(lambda a, b: a * b, m)
    print(modulus)
    multipliers = []
    for m_i in m:
        M = modulus / m_i
        gcd, inverse, y = xeuclid(M, m_i)
        multipliers.append(inverse * M % modulus)

    result = 0
    for multi, a_i in zip(multipliers, a):
        result = (result + multi * a_i) % modulus
    return result

def gcd_array(a):
    for i in range(len(a)):
        for j in range(i+1, len(a)):
            if math.gcd(a[i], a[j]) > 1:
                return False

    return True

def solve(x):
    tmp = []
    mods = []

    for i in range(0, len(x), 2):
        tmp.append((x[i], x[i+1]))
        mods.append(x[i])

    if not gcd_array(mods):
        raise Exception("Sorry, no numbers below zero") 

    return kin_teo(tmp)


def main():
    # lin_kong = [(7, 3), (8, 2), (11, 7), (3, 2)]
    # lin_kong = [(1, 7), (3, 4), (9, 15)]
    lin_kong = [(3, 50), (15, 20)]

    M, x = kin_teo(lin_kong)

    print('{} mod {}'.format(x, M))
    print(all(x % m == r for m, r in lin_kong))


if __name__ == '__main__':
        main()
