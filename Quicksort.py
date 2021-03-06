def quickSort(array):
  if len(array) < 2:
    return array[:]
  else:
    pivot = array[0]
    smaller, bigger = partition(array[1:], pivot)
    smaller = quickSort(smaller)
    bigger = quickSort(bigger)
    return smaller + [pivot] + bigger

# num = 0

def partition(array, pivot):
  smaller = []
  bigger = []
  for item in array:
    if item <= pivot:
      smaller.append(item)
    else:
      bigger.append(item)
  return smaller, bigger

# print (quickSort([3, 4, 6, 9, 100, 2, -2, -333, 34, 2, 5]))
# print (quickSort([6,1,5,4,2]))

lst = list(range(0, 101))
print(quickSort(lst))

print (num)