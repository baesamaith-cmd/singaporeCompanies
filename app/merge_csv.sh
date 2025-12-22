#!/bin/bash

output_file="/Users/wonbaeson/Documents/singCompanies/data/ACRACorporateList.csv"
temp_file_list="/Users/wonbaeson/Documents/singCompanies/app/csv_file_list.txt"

# List all relevant CSV files and sort them alphabetically
find "/Users/wonbaeson/Documents/singCompanies/data/" -name "ACRA Information on Corporate Entities ('*').csv" | sort > "$temp_file_list"

# Get the first file from the sorted list
first_file=$(head -n 1 "$temp_file_list")

# Extract the header from the first file
head -n 1 "$first_file" > "$output_file"

# Iterate through all files, appending content (skipping header)
while IFS= read -r file_path; do
    tail -n +2 "$file_path" >> "$output_file"
done < "$temp_file_list"

# Clean up the temporary file list
rm "$temp_file_list"

echo "Successfully merged files into $output_file"
