export class FormValueCollection<T> {
  public formValueCollection:
    | [
        {
          sectionValues: [
            {
              sectionTabDetails?: [{ indexNumber?: number; formValue?: any }];
              sectionValues: any[];
            }
          ];
        }
      ]
    | undefined;
}
