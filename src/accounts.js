const accounts = [
  { username: "Ironman", id: 1, transactions: [{
    accountId: 1,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
},{
  accountId: 1,
  accountIdFrom: null,
  accountIdTo: null,
  type: "Deposit",
  amount: 10000,
  categoryId: 1,
  description: "company"
}] },
  { username: "BlackWidow", id: 2, transactions: [{
    accountId: 2,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
},{
  accountId: 2,
  accountIdFrom: 6,
  accountIdTo: 2,
  type: "Transfer",
  amount: 1000,
  categoryId: 2,
  description: "rent fee"
}] },
  { username: "Ironman", id: 3, transactions: [{
    accountId: 3,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 50000,
    categoryId: 1,
    description: "Start Industry"
},{
  accountId: 3,
  accountIdFrom: 3,
  accountIdTo: 7,
  type: "Transfer",
  amount: 13000,
  categoryId: 5,
  description: "schoolarship"
},{
  accountId: 3,
  accountIdFrom: null,
  accountIdTo: null,
  type: "Withdraw",
  amount: 10000,
  categoryId: 5,
  description: "party"
}] },
  { username: "CaptinAmerica", id: 4, transactions: [{
    accountId: 4,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 25000,
    categoryId: 1,
    description: "Avengers"
}] },
  { username: "Vision", id: 5, transactions: [{
    accountId: 5,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
}] },
  { username: "Palcon", id: 6, transactions: [ {
    accountId: 6,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
},{
  accountId: 6,
  accountIdFrom: 6,
  accountIdTo: 2,
  type: "Transfer",
  amount: 1000,
  categoryId: 2,
  description: "rent fee"
}] },
  { username: "Thor", id: 7, transactions: [{
    accountId: 7,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
},{
  accountId: 7,
  accountIdFrom: 3,
  accountIdTo: 7,
  type: "Transfer",
  amount: 13000,
  categoryId: 5,
  description: "schoolarship"
}] },
  { username: "SpiderMan", id: 8, transactions: [{
    accountId: 8,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "Avengers"
}] },
  { username: "SpiderMan", id: 9, transactions: [] },
  { username: "SpiderMan", id: 10, transactions: [] },
  { username: "Ironman", id: 11, transactions: [{
    accountId: 11,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 10000,
    categoryId: 1,
    description: "salary"
}] },
  { username: "Ironman", id: 12, transactions: [{
    accountId: 12,
    accountIdFrom: null,
    accountIdTo: null,
    type: "Deposit",
    amount: 18000,
    categoryId: 1,
    description: "salary"
}] }
];

export const getAccounts = () => {
  return accounts;
};

export const addAccount = (username) => {
  const newAccount = { username, id: accounts.length + 1, transactions: [] };
  accounts.push(newAccount);
  return newAccount;
};

export const validateAccount = (accountId) => {
  return accounts.find((acc) => acc.id === accountId);
};

export default { getAccounts, addAccount, validateAccount };
