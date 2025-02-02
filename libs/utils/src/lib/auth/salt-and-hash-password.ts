import { randomBytes, pbkdf2Sync } from 'crypto';

export function saltAndHashPassword(
  password: string,
  saltLength = 16,
  iterations = 100000,
  keyLength = 64,
  digest = 'sha256'
): string {
  const salt = randomBytes(saltLength).toString('hex');
  const hash = pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    digest
  ).toString('hex');
  return `${salt}:${hash}`;
}

export function validatePassword(
  plainPassword: string,
  storedHash: string,
  iterations = 100000,
  keyLength = 64,
  digest = 'sha256'
): boolean {
  const [salt, originalHash] = storedHash.split(':');
  const newHash = pbkdf2Sync(
    plainPassword,
    salt,
    iterations,
    keyLength,
    digest
  ).toString('hex');
  return newHash === originalHash;
}
